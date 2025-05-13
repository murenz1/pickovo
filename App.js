import React, { useState, useEffect, createContext, useReducer, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ErrorBoundary from './src/components/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

// Import Firebase auth
import { auth } from './src/utils/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmail, 
  registerWithEmailAndPassword, 
  logoutUser,
  resetPassword,
  updateUserProfile
} from './src/utils/authService';

// Import navigators
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';

// Create authentication context
export const AuthContext = createContext();

// Auth reducer to handle state changes
const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: null,
        user: null,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
    case 'SET_ERROR':
      return {
        ...prevState,
        error: action.error,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...prevState,
        error: null,
      };
    default:
      return prevState;
  }
};

const Stack = createStackNavigator();

// Add console logging for debugging
console.disableYellowBox = false;
console.reportErrorsAsExceptions = false;

export default function App() {
  // Initial auth state
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    userToken: null,
    user: null,
    error: null,
  });

  // Authentication context functions
  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      try {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        dispatch({ type: 'CLEAR_ERROR' });
        
        const user = await signInWithEmail(email, password);
        const token = await user.getIdToken();
        
        dispatch({ 
          type: 'SIGN_IN', 
          token: token,
          user: user
        });
        
        return user;
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          error: error.message 
        });
        throw error;
      }
    },
    signUp: async (email, password, displayName) => {
      try {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        dispatch({ type: 'CLEAR_ERROR' });
        
        const user = await registerWithEmailAndPassword(email, password);
        // Update display name if provided
        if (displayName) {
          await updateUserProfile(displayName);
        }
        
        const token = await user.getIdToken();
        
        dispatch({ 
          type: 'SIGN_IN', 
          token: token,
          user: user
        });
        
        return user;
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          error: error.message 
        });
        throw error;
      }
    },
    signOut: async () => {
      try {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        await logoutUser();
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          error: error.message 
        });
        throw error;
      }
    },
    resetPassword: async (email) => {
      try {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        dispatch({ type: 'CLEAR_ERROR' });
        
        await resetPassword(email);
        
        dispatch({ type: 'SET_LOADING', isLoading: false });
        return true;
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          error: error.message 
        });
        throw error;
      }
    },
    clearError: () => {
      dispatch({ type: 'CLEAR_ERROR' });
    },
    user: state.user,
    error: state.error,
    isLoading: state.isLoading,
  }), [state.user, state.error, state.isLoading]);

  useEffect(() => {
    // Listen for authentication state changes
    let unsubscribe;
    try {
      console.log('Setting up auth state listener...');
      unsubscribe = onAuthStateChanged(async (user) => {
        try {
          console.log('Auth state changed:', user ? 'User signed in' : 'No user');
          if (user) {
            // User is signed in
            const token = await user.getIdToken();
            dispatch({ 
              type: 'RESTORE_TOKEN', 
              token: token,
              user: user
            });
          } else {
            // User is signed out
            dispatch({ 
              type: 'RESTORE_TOKEN', 
              token: null,
              user: null
            });
          }
        } catch (error) {
          console.error('Error in auth state listener callback:', error);
          dispatch({ 
            type: 'SET_ERROR', 
            error: error.message 
          });
        }
      });
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      // Set a default state if the listener fails
      dispatch({ 
        type: 'RESTORE_TOKEN', 
        token: null,
        user: null
      });
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        console.log('Cleaning up auth state listener...');
        unsubscribe();
      }
    };
  }, []);

  if (state.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Wrap the app with ErrorBoundary
  return (
    <ErrorBoundary>
      <AuthContext.Provider value={authContext}>
        <SafeAreaProvider>
          <PaperProvider>
            <NavigationContainer fallback={<Text>Loading...</Text>}>
              <StatusBar style="auto" />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {state.userToken ? (
                  <Stack.Screen name="Main" component={MainNavigator} />
                ) : (
                  <Stack.Screen name="Auth" component={AuthNavigator} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
