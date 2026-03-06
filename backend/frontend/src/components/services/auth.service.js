import ApiService from './api';

class AuthService {
  async login(email, password) {
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@leadgen.ai' && password === 'password') {
        const user = {
          id: 1,
          name: 'Arjun Kumar',
          email: 'admin@leadgen.ai',
          avatar: 'AK',
          role: 'Admin',
          company: 'LeadGenAI',
          plan: 'Pro',
          joinedAt: '2024-01-15',
        };
        
        const token = 'dummy-jwt-token';
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        
        return { user, token };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        role: 'User',
        company: userData.company || 'My Company',
        plan: 'Free',
        joinedAt: new Date().toISOString().split('T')[0],
      };
      
      const token = 'dummy-jwt-token';
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return true;
  }

  async getCurrentUser() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      return JSON.parse(user);
    }
    
    return null;
  }

  async updateProfile(updates) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      
      throw new Error('No user found');
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();