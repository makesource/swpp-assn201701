from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from omok_rest.models import Room
from django.contrib.auth.models import User
from omok_rest.serializers import *
from omok_rest.permissions import *
import json


# Create your views here.

@api_view(['GET', 'POST'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((PostUserOrReject,))
def room_player_list(request, pk):
	try:
		room = Room.objects.get(pk = pk)
	except Room.DoesNotExist:
		return Response(status = status.HTTP_404_NOT_FOUND)

	serialzier = PlayerSerializer(room)
	if request.method == 'GET':
		return Response(serialzier.data)
	elif request.method == 'POST':
		if room.player1 == None:
			room.player1 = request.user
			room.save()
		elif room.player2 == None:
			room.player2 = request.user
			room.save()
		else:
			return Response(status=status.HTTP_403_FORBIDDEN)
		return Response(status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((PostUserOrReject,))
def room_history_list(request, pk):
	try:
		room = Room.objects.get(pk = pk)
	except Room.DoesNotExist:
		return Response(status = status.HTTP_404_NOT_FOUND)

	serializer = HistorySerializer(room)
	if request.method == 'GET':
		return Response(serializer.data)
	elif request.method == 'POST':
		if (room.player1 != request.user and room.player2 != request.user): # check room player
			return Response(status=status.HTTP_403_FORBIDDEN)
		if (room.turn == 1 and room.player2 == request.user): # check double post
			return Response(status=status.HTTP_403_FORBIDDEN)
		if (room.turn == 2 and room.player1 == request.user):
			return Response(status=status.HTTP_403_FORBIDDEN)

		data = request.body.decode('utf-8') 
		received_json_data = json.loads(data)
		h = History()
		h.player = request.user
		h.room = room
		h.place_i = received_json_data["place_i"]
		h.place_j = received_json_data["place_j"]
		h.save()
		room.win = get_winner(room)
		room.turn = 3 - room.turn
		room.save()
		return Response(status=status.HTTP_201_CREATED)
	return Response(status=status.HTTP_404_NOT_FOUND)

def get_winner(obj):
	d = [[0, 1], [1, 0], [1, 1], [1, -1]]
	squares = [[0 for col in range(19)] for row in range(19)]
	historys = History.objects.filter(room = obj)
	for h in historys:
		who = 1 if obj.player1 == h.player else 2
		squares[h.place_i][h.place_j] = who
	for i in range(19):
		for j in range(19):
			for [dx, dy] in d:
				countO = 0
				countX = 0
				for l in range(-2,2 + 1):
					x = i + dx * l
					y = j + dy * l
					if x < 0 or x > 18 or y < 0 or y > 18:
						break
					if squares[x][y] == 1:
						countO = countO + 1
					elif squares[x][y] == 2:
						countX = countX + 1
					else:
						break
				if countO == 5:
					return 1
				if countX == 5:
					return 2
	return 0

class RoomList(generics.ListCreateAPIView):
	queryset = Room.objects.all()
	serializer_class = RoomSerializer
	permission_classes = (PostAdminUserOrReject, )

class RoomDetail(generics.RetrieveAPIView):
	queryset = Room.objects.all()
	serializer_class = RoomSerializer

class UserList(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	