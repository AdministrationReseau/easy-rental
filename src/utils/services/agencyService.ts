import { AgencyProps } from '../types/AgencyProps';

interface IAgencyService {
  /**
   * Récupère la liste de tous les départements.
   * @returns Une promesse résolue avec un tableau de départements.
   */
  getAllAgencies(): Promise<AgencyProps[]>;

  /**
   * Récupère un département par son ID.
   * @param id L'ID du département.
   * @returns Une promesse résolue avec le département ou undefined s'il n'est pas trouvé.
   */
  getAgencyById(id: number): Promise<AgencyProps | undefined>;

   /**
     * Crée une nouvelle tâche.
     * @param taskData Les données de la nouvelle tâche (sans ID, createdAt, updatedAt).
     * @returns Une promesse résolue avec la tâche créée.
     */
    createAgency(agencyData: Partial<Omit<AgencyProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>>): Promise<AgencyProps>;
  
  
  /**
   * Supprime un département.
   * @param id L'ID du département.
   * @returns Une promesse résolue avec true si la suppression a réussi.
   */
  deleteAgency(id: number): Promise<boolean>;

}

const AgencyService: IAgencyService = {
  async getAllAgencies(): Promise<AgencyProps[]> {
    try {
      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      const response = await fetch('/data/agencies.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json() as AgencyProps[];
    } catch (error) {
      console.error("Failed to fetch agencys:", error);
      throw error;
    }
  },

  async getAgencyById(id: number): Promise<AgencyProps | undefined> {
    const agencys = await this.getAllAgencies();
    return agencys.find(a => a.id === id);
  },

  async createAgency(agencyData: Partial<Omit<AgencyProps, 'id'|'followers'|'rating'|'images'|'reviews'|'createAt'|'updateAt'>> ): Promise<AgencyProps> {
      // Simuler l'ajout côté backend
      await new Promise(resolve => setTimeout(resolve, 300));
      const newId = (await this.getAllAgencies()).length + 1;
      const now = new Date();

      const newAgency: AgencyProps = {
          id: newId,
          ...agencyData,
          followers: 0,  
          rating: 0,
          createdAt: now,
          updatedAt: now,
          reviews: [],
          images: []
      }as AgencyProps;
  
      // Ici, en production, on ferait un POST à l'API
      console.log("Simulating task creation:", newAgency);
      return newAgency;
    },

  async deleteAgency(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Simulating deletion of task with id: ${id}`);
    return true; // Simule la suppression réussie
  },

};

export default AgencyService;