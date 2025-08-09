import { CarProps } from '../types/CarProps';

interface IVehicleService {
  /**
   * Récupère la liste de tous les départements.
   * @returns Une promesse résolue avec un tableau de départements.
   */
  getAllVehicles(): Promise<CarProps[]>;

  /**
   * Récupère un département par son ID.
   * @param id L'ID du département.
   * @returns Une promesse résolue avec le département ou undefined s'il n'est pas trouvé.
   */
  getVehicleById(id: number): Promise<CarProps | undefined>;

   /**
     * Crée une nouvelle tâche.
     * @param taskData Les données de la nouvelle tâche (sans ID, createdAt, updatedAt).
     * @returns Une promesse résolue avec la tâche créée.
     */
    createVehicle(vehicleData: Partial<Omit<CarProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>>): Promise<CarProps>;
  
  
  /**
   * Supprime un département.
   * @param id L'ID du département.
   * @returns Une promesse résolue avec true si la suppression a réussi.
   */
  deleteVehicle(id: number): Promise<Boolean>;

  calculateRentalPrice(vehicleId: number, startDate: Date, endDate: Date): Promise<number>
}

const VehicleService: IVehicleService = {
  async getAllVehicles(): Promise<CarProps[]> {
    try {
      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      const response = await fetch('/data/cars.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json() as CarProps[];
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      throw error;
    }
  },

  async getVehicleById(id: number): Promise<CarProps | undefined> {
    const vehicles = await this.getAllVehicles();
    return vehicles.find(v => v.id === id);
  },

  async createVehicle(vehicleData: Partial<Omit<CarProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>> ): Promise<CarProps|null> {
      // Simuler l'ajout côté backend
      await new Promise(resolve => setTimeout(resolve, 300));
      const newId = (await this.getAllVehicles()).length + 1;
      

      const newVehicle: CarProps = {
          id: newId,
          ...vehicleData,
          pricePerDay: 0,
          fonctionnalities: {
              air_condition: false,
              usb_input: false,
              seat_belt: false,
              audio_input: false,
              child_seat: false,
              bluetooth: false,
              sleeping_bed: false,
              onboard_computer: false,
              gps: false,
              luggage: false,
              water: false,
              additional_covers: false
          },
          images: []
      };
      delete (newVehicle as any).assignedById; // Supprimer la propriété pour qu'elle corresponde au type Task
  
      // Ici, en production, on ferait un POST à l'API
      console.log("Simulating task creation:", newVehicle);
      return newVehicle;
    },

  async deleteVehicle(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Simulating deletion of task with id: ${id}`);
    return true; // Simule la suppression réussie
  },

  
    async calculateRentalPrice(vehicleId: number, startDate: Date, endDate: Date): Promise<number> {
        try {
            const vehicle = await this.getVehicleById(vehicleId);
            if (!vehicle) throw new Error('Vehicle not found');

            const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            if (days <= 0) throw new Error('End date must be after start date');

            return days * vehicle.pricePerDay;
        } catch (error) {
            console.error('Error calculating rental price:', error);
            return 0;
        }
    }
};

export default VehicleService;