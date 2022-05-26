import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postSlice'
import usersReducer from '../features/users/usersSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import notificationsSlice from '../features/notifications/notificationsSlice'
import { apiSlice } from '../features/api/apiSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
