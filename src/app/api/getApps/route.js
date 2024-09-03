import { v4 as uuidv4 } from 'uuid';

// Mock data for job applications
let applications = [
  {
    id: uuidv4(),
    company: 'Microsoft',
    role: 'FullStack Developer',
    appliedDate: '2024-08-15',
    updatedDate: '2024-08-23',
    status: 'REJECTED',
    referral: 'COLD APPLY',
  },
  {
    id: uuidv4(),
    company: 'Google',
    role: 'Backend Engineer',
    appliedDate: '2024-07-20',
    updatedDate: '2024-08-10',
    status: 'OFFER',
    referral: 'REFERRED',
  },
  // Add more mock applications here
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the list of applications
    res.status(200).json(applications);
  } else if (req.method === 'POST') {
    // Add a new application
    const newApplication = {
      id: uuidv4(),
      ...req.body,
    };
    applications.push(newApplication);
    res.status(201).json(newApplication);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
