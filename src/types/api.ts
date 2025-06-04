export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface TransactionResponse {
  type: TransactionType;
  amount: number;
  timestamp: string; // Assuming LocalDateTime will be serialized as a string
  description?: string;
}

export interface TransactionRequest {
  type: TransactionType;
  amount: number;
  description?: string;
}

// Assuming TransactionType is an enum that needs to be defined
// If it's already defined elsewhere, this can be removed or adjusted.
export enum TransactionType {
  // Add possible transaction types here, e.g., DEBIT, CREDIT
  // For now, I'll add some placeholders.
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export interface TransferRequest {
  toIdentifier: string;
  identifierType: IdentifierType;
  amount: number;
}

export interface TransferResponse {
  toIdentifier: string;
  identifierType: IdentifierType;
  amount: number;
  timestamp: string;
}

export enum IdentifierType {
  ALIAS = 'ALIAS',
  CVU = 'CVU',
}

export interface TopUpRequest {
  amount: number;
}

export interface TopUpResponse {
  amount: number;
  timestamp: string;
}

export interface DebinRequestDto {
  amount: number;
}

export interface DebinResponse {
  amount: number;
  timestamp: string;
}

export interface BalanceResponse {
  balance: number;
}

export interface AccountDetails {
  email: string;
  alias: string;
  cvu: string;
} 