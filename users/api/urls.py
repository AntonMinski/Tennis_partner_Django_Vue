from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import ( TokenObtainPairView,
                                         TokenRefreshView, TokenVerifyView, )
from . import views


# router = DefaultRouter()
# router.register(r'', views.BaseUserViewSet)
# router.register(r'messages', views.MessageViewSet, basename="status") # basename указывается в тестах (list_url = reverse("status-list")


urlpatterns = [
    path('profiles/', views.UserProfileListApiView.as_view(), name='user-profile-list'),
    path('', views.BaseUserViewSet.as_view()),
    # path('avatar/', views.AvatarUpdateView.as_view(), name='avatar-update'),
    path('register/', views.RegisterCreateApiView.as_view(), name='register'),
    path('avatar/', views.AvatarUpdateView.as_view(), name='avatar-update'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]
