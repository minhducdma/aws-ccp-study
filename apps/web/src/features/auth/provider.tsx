import {
  LoadingOverlay,
} from '@study/ui';
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
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { auth } from '../../services/firebase/config';
import { bindProgressUser } from '../course/progress';
import { useI18n } from '../../i18n';

export interface AuthValue {
  /** Undefined while Firebase has not resolved the initial session yet. */
  user: User | null | undefined;
  loading: boolean;
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
  const { t } = useI18n();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [pendingActions, setPendingActions] = useState(0);
  const loading = user === undefined || pendingActions > 0;

  const runAuthAction = useCallback(async (action: () => Promise<void>) => {
    setPendingActions((count) => count + 1);
    try {
      await action();
    } finally {
      setPendingActions((count) => Math.max(0, count - 1));
    }
  }, []);

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
      loading,
      signUp: (email, password, displayName, remember) =>
        runAuthAction(async () => {
          await setAuthPersistence(remember);
          const credential = await createUserWithEmailAndPassword(auth, email, password);
          if (displayName) await updateProfile(credential.user, { displayName });
        }),
      signIn: (email, password, remember) =>
        runAuthAction(async () => {
          await setAuthPersistence(remember);
          await signInWithEmailAndPassword(auth, email, password);
        }),
      signInWithGoogle: (remember) =>
        runAuthAction(async () => {
          await setAuthPersistence(remember);
          await signInWithPopup(auth, googleProvider);
        }),
      logOut: () => runAuthAction(() => signOut(auth)),
    }),
    [loading, runAuthAction, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoadingOverlay open={loading} label={t('auth.processing')} />
    </AuthContext.Provider>
  );
}
