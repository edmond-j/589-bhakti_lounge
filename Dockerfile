#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:22 AS build-frontend
WORKDIR /app
# Copy everything
COPY ./bhaktilounge.client ./
# Restore as distinct layers
RUN npm install
# Build and publish a release
RUN npm run build


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend
WORKDIR /app
# Copy everything
COPY ./BhaktiLounge.Server/ /app/
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0  AS final
WORKDIR /app
COPY --from=build-frontend /app/dist/ ./wwwroot
COPY --from=build-backend /app/out/ .
EXPOSE 8080
ENTRYPOINT ["dotnet", "BhaktiLounge.Server.dll"]
