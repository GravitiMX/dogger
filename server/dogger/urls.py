from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from dogger import views

urlpatterns = [
    path('users/', views.UsersView.as_view()),
    path('dogs3/<str:owner>', views.Dogs3View.as_view()),
    path('users/<str:pk>/<str:email>', views.UsersDetailsView.as_view()),
    path('usersBody/', views.UsersBodyView.as_view()),
    path('walkersBody/', views.WalkersBodyView.as_view()),
    path('users/<int:pk>/', views.UsersDetailsView.as_view()),
    path('dogs/', views.DogsView.as_view()),
    path('dogs/<int:pk>/', views.DogsDetailsView.as_view()),
    path('dog-size/', views.DogSizeView.as_view()),
    path('dog-size/<int:pk>/', views.DogSizeDetailsView.as_view()),
    path('schedule/', views.SchedulesView.as_view()),
    path('schedule/<int:pk>/', views.SchedulesDetailsView.as_view()),
    path('schedule3/<str:pk>/', views.Schedules3DetailsView.as_view()),
    path('dogSizeForWalker/<str:pk>/', views.DogSizeForWalkerDetailsView.as_view()),
    path('scheduled-walks/', views.ScheduledWalksView.as_view()),
    path('scheduled-walks/<int:pk>/', views.ScheduledWalksDetailsView.as_view()),
    path('scheduled-walks-for-walker/<str:pk>/', views.ScheduledWalksForWalkerDetailsView.as_view()),
    path('schedule-day-for-walker/<str:pk>/', views.SchedulesDetailsForWalkerView.as_view()),
    path('schedule-hour-for-walker-and-day/<str:pk>/<str:day>', views.SchedulesDetailsForWalkerAndDayView.as_view()),
    path('walkers/<str:pk>/<str:email>', views.WalkersDetailsView.as_view()),
    path('walkers/', views.WalkersView.as_view()),
    path('walkers/<str:pk>/', views.WalkersDetailsView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)