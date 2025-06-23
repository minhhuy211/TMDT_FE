export  interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  verificationCode: string;
  roles: string[];
  avatarUrl : string;

}


export interface UserInfo {
  id: string;
  username: string;
  password?: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  verificationCode?: string | null;
  verificationCodeExpireAt?: string | null;
  dob?: string | null;
  roles?: string[]; // là mảng string: ["USER", ...]
}

export interface APIResponse<T> {
  code: number;
  result: T;
}
// UserCreationRequest.ts
export  interface UserCreationRequest {
  username: string;
  password: string;
  email: string;
}

// UserResponse.ts
export interface UserResponse {
  id: string;
  username: string;
  password: string;
  email: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: string;
  roles: string[];
  avatarUrl : string;
}
export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  dob?: string;
  phoneNumber?: string;
}
export interface CreateStaffRequest {
  username: string;
  email: string;
  password: string;
  roles: string[]; // hoặc Set<string> nếu bạn đang sử dụng Set serialization
}

