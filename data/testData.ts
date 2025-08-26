export const testData = {
  users: [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main Street, New York, NY 10001',
      gender: 'male' as const,
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      address: '456 Oak Avenue, Los Angeles, CA 90001',
      gender: 'female' as const,
    },
  ],
  
  countries: ['India', 'United States', 'Canada', 'Australia'],
  colors: ['Red', 'Green', 'Blue', 'Yellow'],
  weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  weekendDays: ['Saturday', 'Sunday'],
};
