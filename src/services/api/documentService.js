import documents from "@/services/mockData/documents.json";

// Simulate API delays for realistic user experience
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DocumentService {
  constructor() {
    this.documents = [...documents];
  }

  async getAll() {
    await delay(300);
    return [...this.documents];
  }

  async getById(id) {
    await delay(250);
    const document = this.documents.find(doc => doc.Id === id);
    return document ? { ...document } : null;
  }

  async create(documentData) {
    await delay(400);
    
    const newId = Math.max(...this.documents.map(doc => doc.Id), 0) + 1;
    const newDocument = {
      Id: newId,
      ...documentData,
      uploadDate: documentData.uploadDate || new Date().toISOString()
    };
    
    this.documents.push(newDocument);
    return { ...newDocument };
  }

  async update(id, updateData) {
    await delay(350);
    
    const index = this.documents.findIndex(doc => doc.Id === id);
    if (index === -1) {
      throw new Error("Document not found");
    }
    
    this.documents[index] = {
      ...this.documents[index],
      ...updateData
    };
    
    return { ...this.documents[index] };
  }

  async delete(id) {
    await delay(300);
    
    const index = this.documents.findIndex(doc => doc.Id === id);
    if (index === -1) {
      throw new Error("Document not found");
    }
    
    const deletedDocument = this.documents.splice(index, 1)[0];
    return { ...deletedDocument };
  }

  async searchDocuments(query) {
    await delay(200);
    
    const lowercaseQuery = query.toLowerCase();
    return this.documents.filter(doc =>
      doc.fileName.toLowerCase().includes(lowercaseQuery) ||
      doc.analysisResult?.plainEnglishSummary?.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getDocumentsByRisk(riskLevel) {
    await delay(250);
    
    return this.documents.filter(doc => 
      doc.analysisResult?.riskLevel === riskLevel
    );
  }
}

export const documentService = new DocumentService();