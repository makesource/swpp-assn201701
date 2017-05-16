from django.conf.urls import url, include
from django.contrib import admin
from omok_rest import views

urlpatterns = [
	url(r'^rooms/?$', views.RoomList.as_view()),
	url(r'^rooms/(?P<pk>[0-9]+)/?$', views.RoomDetail.as_view()),
	url(r'^rooms/(?P<pk>[0-9]+)/players/?$', views.room_player_list),
	url(r'^rooms/(?P<pk>[0-9]+)/history/?$', views.room_history_list),
	url(r'^users/?$', views.UserList.as_view()),
	url(r'^users/(?P<pk>[0-9]+)/?$', views.UserDetail.as_view()),
	url(r'^api-auth/', include('rest_framework.urls', namespace = 'rest_framework')),
]
