/**
 * Collection ID: pharmacies
 * Interface for Pharmacies
 */
export interface Pharmacies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  openingHours?: string;
  /** @wixFieldType image */
  imageUrl?: string;
}
