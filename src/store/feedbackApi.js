import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    // Получение всех отзывов
    getFeedbacks: builder.query({
      query: () => '/feedback/',
      providesTags: ['Feedback']
    }),
    
    // Создание нового отзыва
    createFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: '/feedback/',
        method: 'POST',
        body: feedbackData
      }),
      invalidatesTags: ['Feedback']
    }),
    
    // Удаление отзыва
    deleteFeedback: builder.mutation({
      query: ({ feedbackId, credentials }) => ({
        url: `/feedback/delete/${feedbackId}`,
        method: 'DELETE',
        body: credentials
      }),
      invalidatesTags: ['Feedback']
    }),
    
    // Блокировка отзыва
    blockFeedback: builder.mutation({
      query: ({ feedbackId, credentials }) => ({
        url: `/feedback/block/${feedbackId}`,
        method: 'PUT',
        body: credentials
      }),
      invalidatesTags: ['Feedback']
    })
  })
});

export const { 
  useGetFeedbacksQuery, 
  useCreateFeedbackMutation, 
  useDeleteFeedbackMutation, 
  useBlockFeedbackMutation 
} = feedbackApi;