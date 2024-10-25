export interface UserProfile {
    username?: string;
    name?: string;
    lastName?: string;
    dob?: string;  // Date of Birth
    photo?: string | null;  // URL or null if no photo
    cpf?: string;  // Brazilian individual taxpayer registry
    number?: string;  // Phone number
  }