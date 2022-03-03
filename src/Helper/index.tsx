import React from "react";

export function getAuthTokenString() {
  return sessionStorage.getItem("auth-token");
}
