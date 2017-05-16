from rest_framework import permissions
from django.contrib.auth.models import AnonymousUser

class PostAdminUserOrReject(permissions.BasePermission):
	def has_permission(self, request, view):
		if request.method == 'POST':
			return request.user.username == 'omok_admin'
		return True

class PostUserOrReject(permissions.BasePermission):
	def has_permission(self, request, view):
		if request.method == 'POST':
			return request.user.is_authenticated()
		return True