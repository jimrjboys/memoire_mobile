export interface Address 
{
  name?: string,
  addressLine1?: string,
  addressLine2?: string,
  street?: string,
  buildingNumber?: string,
  complement?: string,
  zip?: string,
  poBox?: string,
  neighborhood?: string,
  city?: string,
  region?: string,
  country?: string,
  location?: {
    latitude?: 0,
    longitude?: 0
  },
  defaultAddress?: true,
  hidden?: true
}
