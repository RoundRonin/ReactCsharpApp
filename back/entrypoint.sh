#!/bin/bash

PENDING_MIGRATIONS=$(dotnet ef migrations list --context AppDbContext | grep "No migrations were found.")

if [ -z "$PENDING_MIGRATIONS" ]; then
  echo "No pending migrations."
else
  echo "Pending migrations found. Applying migrations..."

  cd /app/API
  TIMESTAMP=$(date +"%Y%m%d%H%M%S")
  dotnet ef migrations add AutoMigration_$TIMESTAMP --project ../Infrastructure --startup-project .
  dotnet ef database update --project ../Infrastructure --startup-project .
fi

dotnet watch --project /app/API/API.csproj

