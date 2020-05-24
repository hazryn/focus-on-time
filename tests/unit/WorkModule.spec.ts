import { WorkModule } from '@/lib/WorkModule';
import { WorkLog } from '@/store/work/interfaces';

describe('WorkModule', () => {
  const store = {};
  const electronStore = {};
  const workModule = new WorkModule(store, electronStore);

  describe('#calculateTimeForWorkLog', () => {
    it('should return 2 hours difference', () => {
      const workLog = {
        time: [
          {
            startTime: new Date('2020-01-01 10:00'),
            endTime: new Date('2020-01-01 12:00')
          }
        ]
      } as unknown as WorkLog;

      const result = workModule.calculateTimeForWorkLog(workLog);
      expect(result).toEqual(120);
    });

    it('should return 3 hours difference', () => {
      const workLog = {
        time: [
          {
            startTime: new Date('2020-01-01 10:00'),
            endTime: new Date('2020-01-01 12:56')
          }
        ]
      } as unknown as WorkLog;

      const result = workModule.calculateTimeForWorkLog(workLog);
      expect(result).toEqual(180);
    });

    it('should return 0 minutes', () => {
      const workLog = {
        time: [
          {
            startTime: new Date('2020-01-01 10:00'),
            endTime: new Date('2020-01-01 10:00:55')
          }
        ]
      } as unknown as WorkLog;

      const result = workModule.calculateTimeForWorkLog(workLog);
      expect(result).toEqual(0);
    });

    it('should round minutes to 5', () => {
      const workLog = {
        time: [
          {
            startTime: new Date('2020-01-01 10:00'),
            endTime: new Date('2020-01-01 10:01')
          }
        ]
      } as unknown as WorkLog;

      const result = workModule.calculateTimeForWorkLog(workLog);
      expect(result).toEqual(5);
    });

    it('should return 2h 45m', () => {
      const workLog = {
        time: [
          { startTime: new Date('2020-01-01 15:00'), endTime: new Date('2020-01-01 17:45') },
        ]
      } as unknown as WorkLog;

      const result = workModule.calculateTimeForWorkLog(workLog);
      expect(result).toEqual(2 * 60 + 45);
    });

    it('should sum times', () => {
      const workLog = {
        time: [
          { startTime: new Date('2020-01-01 10:00'), endTime: new Date('2020-01-01 11:00') },
          { startTime: new Date('2020-01-01 12:00'), endTime: new Date('2020-01-01 12:16') },
        ]
      } as unknown as WorkLog;

      const result = workModule.calculateTimeForWorkLog(workLog);
      expect(result).toEqual(80);
    });
  });
});
