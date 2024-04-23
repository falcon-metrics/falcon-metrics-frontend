import { Story, Meta } from '@storybook/react';
import BulletPoint, { Props } from './BulletPoint';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default {
  title: 'core/BulletPoint',
  component: BulletPoint,
} as Meta;

export const Template: Story<Omit<Props, 'iconNode'>> = (args) => (
  <BulletPoint {...args} iconNode={<CheckCircleIcon />} />
);
