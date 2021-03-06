"""tennis_partner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import OffersList
    2. Add a URL to urlpatterns:  path('', OffersList.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from base.views import IndexTemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('core/', include("base.urls")),
    path('api/courts/', include("courts.api.urls")),
    path('api/users/', include("users.api.urls")),
    path('api/', include("offers.api.urls")),

    re_path(r"^.*$", IndexTemplateView.as_view(), name="entry-point")

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
