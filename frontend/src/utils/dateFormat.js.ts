import moment from 'moment';

export const MMMDyyyy = (date: Date) => {
  return moment(date).format('MMM D, yyyy');
};
