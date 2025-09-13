/**
 * Collection ID: emergencyresources
 * Interface for EmergencyResources
 */
export interface EmergencyResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceName?: string;
  /** @wixFieldType text */
  contactNumber?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType image */
  resourceImage?: string;
  /** @wixFieldType text */
  availabilityInfo?: string;
}
