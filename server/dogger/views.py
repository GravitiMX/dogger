from django.shortcuts import render
from django.contrib.auth.models import User as Auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import Http404
from dogger.serializers import *
from dogger.models import Users as UsersModel
from dogger.models import Dogs as DogsModel
from dogger.models import DogSize as DogSizeModel
from dogger.models import Schedules as SchedulesModel
from dogger.models import ScheduledWalks as ScheduledWalksModel
from dogger.models import Walkers as WalkersModel
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
# Create your views here.	


class DogsView(APIView):
	"""
	List all users, or create new user.
	"""
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)

	@method_decorator(csrf_exempt)
	def get(self, request, format=None):
		users = DogsModel.objects.all()
		serializer = DogSerializer(users, many=True)
		return Response(serializer.data)

	@csrf_exempt
	def post(self, request, format=None):
		datas = json.loads(request.body)
		
		user = UsersModel.objects.get(pk = datas['owner'])
		
		print(datas)
		serializerUser = UserSerializer(user)
		data = request.data
		print(data)
		dog = Dogs.objects.create(name = datas['name'], age = datas['age'], size = datas['size'], breed = datas['breed'], owner =user )
		print(data)
		data['owner'] = serializerUser.data
		print(data)
		serializer = DogSerializer(data=data)
		
		return Response({'success':'success'}, status=status.HTTP_201_CREATED)
		

class Dogs3View(APIView):
	"""
	List all users, or create new user.
	"""
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)

	@method_decorator(csrf_exempt)
	def get(self, request,owner, format=None):
		users = DogsModel.objects.filter(owner = owner)
		serializer = DogSerializer(users, many=True)
		return Response(serializer.data)

	@csrf_exempt
	def post(self, request, format=None):
		datas = json.loads(request.body)
		
		user = UsersModel.objects.get(pk = datas['owner'])
		
		print(datas)
		serializerUser = UserSerializer(user)
		data = request.data
		print(data)
		dog = Dogs.objects.create(name = datas['name'], age = datas['age'], size = datas['size'], breed = datas['breed'], owner =user )
		print(data)
		data['owner'] = serializerUser.data
		print(data)
		serializer = DogSerializer(data=data)
		
		return Response({'success':'success'}, status=status.HTTP_201_CREATED)
		



class DogsDetailsView(APIView):
	"""
	Retrieve, update or delete a dog instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogsModel.objects.get(pk=pk)
		except Dogs.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class UsersView(APIView):
	"""
	List all users, or create new user.
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	"""
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)


	@method_decorator(csrf_exempt)
	def get(self, request, format=None):
		users = UsersModel.objects.all()
		serializer = UserSerializer(users, many=True)
		return Response(serializer.data)

	@csrf_exempt
	def post(self, request, format=None):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsersBodyView(APIView):
	def post(self, request, format=None):
		datas = json.loads(request.body)
		print(datas)
		try:
			user = UsersModel.objects.get(email = datas['email'], password = datas['password'])
			print(user)
			serializer = UserSerializer(user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		except:
			print("error")

class WalkersBodyView(APIView):
	def post(self, request, format=None):
		datas = json.loads(request.body)
		print(datas)
		try:
			user = WalkersModel.objects.get(email = datas['email'], password = datas['password'])
			print(user)
			serializer = WalkerSerializer(user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		except:
			print("error")
	

		



class UsersDetailsView(APIView):
	"""
	Retrieve, update or delete a dog instance.
	"""
	
	def get_object(self, pk, email):
		try:
			user = UsersModel.objects.get(pk=email)
			if user.email == email:
				return user
			return Http404
		except User.DoesNotExist:
			raise Http404

	def get(self, request,pk, email):
		user = self.get_object(pk =  pk, email = email)
		serializer = UserSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = UserSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response( status=status.HTTP_204_NO_CONTENT)



class DogSizeView(APIView):
	"""
	List all dog sizes
	"""
	def get(self, request, format=None):
		users = DogSizeModel.objects.all()
		serializer = DogSizeSerializer(users, many=True)
		return Response(serializer.data)
	def post(self, request, format=None):
		datas = json.loads(request.body)
		print(datas)
		user = WalkersModel.objects.get(pk = datas['email'])
		
		serializerUser = WalkerSerializer(user)
		data = request.data
		schedule = DogSize.objects.create(size = datas['size'],  walker =user )

		return Response({'success':'success'}, status=status.HTTP_201_CREATED)
		
class DogSizeDetailsView(APIView):
	"""
	List a dog size instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogSizeModel.objects.get(pk=pk)
		except DogSize.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSizeSerializer(user)
		return Response(serializer.data)

class DogSizeForWalkerDetailsView(APIView):
	"""
	List a dog size instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return DogSizeModel.objects.filter(walker=pk)
		except DogSize.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = DogSizeSerializer(user, many = True)
		return Response(serializer.data)





class WalkersView(APIView):
	"""
	List all walkers, create a new walker.
	"""
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)
	#permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	@method_decorator(csrf_exempt)
	def get(self, request, format=None):
		users = WalkersModel.objects.all()
		serializer = WalkerSerializer(users, many=True)
		return Response(serializer.data)
	@method_decorator(csrf_exempt)
	def post(self, request, format=None):
		serializer = WalkerSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class WalkersDetailsView(APIView):
	"""
	Retrieve, update or delete a walker instance.
	"""
	
	def get_object(self, pk, email):
		print(pk, email)
		try:
			user = WalkersModel.objects.get(pk=pk)
			print(user)
			if user.email == email:
				return user
			return Http404
		except Walkers.DoesNotExist:
			raise Http404
	
	def get(self, request, pk,email, format=None):
		user = self.get_object(pk, email)
		serializer = WalkerSerializer(user)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = WalkerSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)






class SchedulesView(APIView):
	"""
	List all schedules, create new schedules.
	"""
	

	def get(self, request, format=None):
		users = SchedulesModel.objects.all()
		serializer = ScheduleSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		datas = json.loads(request.body)
		
		print(datas)
		user = WalkersModel.objects.get(email = datas['email'])
		
		serializerUser = WalkerSerializer(user)
		data = request.data
		print(data)
		schedule = Schedules.objects.create(day_of_week = datas['day'], hour= datas['hour'], walker =user )
		print(data)
		data['owner'] = serializerUser.data
		print(data)
		serializer = DogSerializer(data=data)
		
		return Response({'success':'success'}, status=status.HTTP_201_CREATED)
		



class SchedulesDetailsView(APIView):
	"""
	Retrieve, update or delete a schedule instance.
	"""
	
	def get_object(self, pk):
		print(pk)
		try:
			return SchedulesModel.objects.get(walker=pk)
		except Schedules.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		
		serializer = ScheduleSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduleSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)



class Schedules3DetailsView(APIView):
	"""
	Retrieve, update or delete a schedule instance.
	"""
	
	def get_object(self, pk):
		print(pk)
		try:
			return SchedulesModel.objects.filter(walker=pk)
		except Schedules.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		
		serializer = ScheduleSerializer(user, many =True)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduleSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)



class SchedulesDetailsForWalkerView(APIView):
	"""
	Retrieve, update or delete a schedule instance.
	"""
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)


	@method_decorator(csrf_exempt)
	def get_object(self, pk):
		schedules = SchedulesModel.objects.filter(walker=pk).values( 'day_of_week', 'hour'	 )
		
		print(schedules)
		try:
			return schedules
		except Schedules.DoesNotExist:
			raise Http404
	@method_decorator(csrf_exempt)
	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		
		print(user)
		serializer = ScheduleSerializer(user, many =True	)

		return Response(serializer.data)
	@method_decorator(csrf_exempt)
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduleSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	@method_decorator(csrf_exempt)
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)



class SchedulesDetailsForWalkerAndDayView(APIView):
	"""
	Retrieve, update or delete a schedule instance.
	"""
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super().dispatch(request, *args, **kwargs)


	@method_decorator(csrf_exempt)
	def get_object(self, pk, day):
		schedules = SchedulesModel.objects.filter(walker=pk, day_of_week = day).values('id', 'day_of_week', 'hour')
		
		try:
			return schedules
		except Schedules.DoesNotExist:
			raise Http404
	@method_decorator(csrf_exempt)
	def get(self, request, pk, day, format=None):
		user = self.get_object(pk, day)
		
		serializer = ScheduleSerializer(user, many =True	)

		return Response(serializer.data)
	@method_decorator(csrf_exempt)
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduleSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	@method_decorator(csrf_exempt)
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)



class ScheduledWalksView(APIView):
	"""
	List all scheduled walks, create a new scheduled walk.
	"""	
	def get(self, request, format=None):
		users = ScheduledWalksModel.objects.all()
		serializer = ScheduledWalkSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		
		datas = json.loads(request.body)
		
		user = WalkersModel.objects.get(pk = datas['walker'])
		print(datas)
		dog = DogsModel.objects.get(name = datas['dog'], owner = datas['owner'])
		print("perro")
		dog.save(walker=user) 
		

		ScheduledWalks.objects.create(day_of_week = datas['day_of_week'], hour = datas['hour'], dog =dog, walker = user   )
		 
		
		return Response({'success':'success'}, status=status.HTTP_201_CREATED)
		
class ScheduledWalksDetailsView(APIView):
	"""
	Retrieve, update or delete a scheduled walk instance.
	"""
	
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	
	def get_object(self, pk):
		try:
			return ScheduledWalksModel.objects.get(pk=pk)
		except ScheduledWalks.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduledWalkSerializer(user)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduledWalkSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
class ScheduledWalksForWalkerDetailsView(APIView):
	"""
	Retrieve, update or delete a scheduled walk instance.
	"""
	
	def get_object(self, pk):
		try:
			query = DogsModel.objects.select_related('walker')

			print(query)
			return 
		except ScheduledWalks.DoesNotExist:
			raise Http404

	def get(self, request, pk,  format=None):
		user = self.get_object(pk)
		
		return Response(user)
	
	def put(self, request, pk, format=None):
		user = self.get_object(pk)
		serializer = ScheduledWalkSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		user = self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
