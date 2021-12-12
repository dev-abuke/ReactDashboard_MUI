import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from './mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  username: faker.name.lastName(),
  createdBy: sample(['Manager', 'System']),
  team: sample(['UI Team', 'Frontend Team']),
  status: sample(['Active', 'Pending', 'Banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer'
  ])
}));

export default users;
