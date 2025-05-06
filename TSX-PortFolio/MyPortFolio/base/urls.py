from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # URL pattern for the index view
    path('index1/', views.index_1_view, name='index-1'),
    path('index2/', views.index_2_view, name='index-2'),
]
