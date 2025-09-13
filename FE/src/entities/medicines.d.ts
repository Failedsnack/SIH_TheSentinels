/**
 * Collection ID: medicines
 * Interface for Medicines
 */
export interface Medicines {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  medicineName?: string;
  /** @wixFieldType image */
  medicineImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  dosageInformation?: string;
  /** @wixFieldType text */
  activeIngredient?: string;
  /** @wixFieldType text */
  manufacturer?: string;
}
