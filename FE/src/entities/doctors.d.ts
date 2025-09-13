/**
 * Collection ID: doctors
 * Interface for Doctors
 */
export interface Doctors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  specialty?: string;
  /** @wixFieldType text */
  qualifications?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  clinicAddress?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType number */
  consultationFee?: number;
  /** @wixFieldType boolean */
  isAcceptingNewPatients?: boolean;
}
