from omok_rest.models import Room, History
from rest_framework import serializers
from django.contrib.auth.models import User

class PlayerSerializer(serializers.BaseSerializer):
	def to_representation(self, obj):
		l1 = ([ obj.player1.id ] if obj.player1 else [])
		l2 = ([ obj.player2.id ] if obj.player2 else [])
		return l1 + l2
	class Meta:
		model = Room

class HistorySerializer(serializers.BaseSerializer):
	def to_representation(self, obj):
		historys = History.objects.filter(room = obj);
		lists = []
		for h in historys:
			lists.append({
				"id": h.id,
				"player": h.player.id,
				"room": h.room.id,
				"place_i": h.place_i,
				"place_j": h.place_j
			})
		return lists

	class Meta:
		model = Room

class RoomSerializer(serializers.ModelSerializer):
	class Meta:
		model = Room
		fields = ('id', 'player1', 'player2', 'win', 'turn')

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username')