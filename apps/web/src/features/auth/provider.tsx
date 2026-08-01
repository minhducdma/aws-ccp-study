import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { auth } from '../../services/firebase/config';
import { bindProgressUser } from '../course/progress';

export interface AuthValue {
  /** Undefined while Firebase has not resolved the initial session yet. */
  user: User | null | undefined;
  signUp: (email: string, password: string, displayName: string | undefined, remember: boolean) => Promise<void>;
  signIn: (email: string, password: string, remember: boolean) => Promise<void>;
  signInWithGoogle: (remember: boolean) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be called inside AuthProvider.');
  return value;
}

const googleProvider = new GoogleAuthProvider();

function setAuthPersistence(remember: boolean) {
  return setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(
    () =>
      onAuthStateChanged(auth, (next) => {
        setUser(next);
        bindProgressUser(next?.uid ?? null);
      }),
    [],
  );

  const value = useMemo<AuthValue>(
    () => ({
      user,
      signUp: async (email, password, displayName, remember) => {
        await setAuthPersistence(remember);
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) await updateProfile(credential.user, { displayName });
      },
      signIn: async (email, password, remember) => {
        await setAuthPersistence(remember);
        await signInWithEmailAndPassword(auth, email, password);
      },
      signInWithGoogle: async (remember) => {
        await setAuthPersistence(remember);
        await signInWithPopup(auth, googleProvider);
      },
      logOut: async () => {
        await signOut(auth);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
