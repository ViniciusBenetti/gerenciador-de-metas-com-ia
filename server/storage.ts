// Basic storage interface for potential future use
// Currently the app uses external API authentication via https://vinixodin.com/api/gerenciadorIA3
// No local user storage needed as per requirements (doesn't authenticate on exit)

export interface IStorage {
  // Add storage methods here if needed for other data
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize any needed storage here
  }
}

export const storage = new MemStorage();
