import { AccessCode } from '../types';

export const generateInitialCodes = (): AccessCode[] => {
  const codes: AccessCode[] = [];
  const usedCodes = new Set<string>();

  const generateCode = (startWithZero: boolean): string => {
    let code = '';
    do {
      if (startWithZero) {
        code = '0' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
      } else {
        code = Math.floor(100000 + Math.random() * 900000).toString();
      }
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
  };

  for (let i = 0; i < 30; i++) {
    codes.push({
      code: generateCode(true),
      type: '24H',
      status: 'AVAILABLE',
      createdAt: new Date().toISOString()
    });
  }

  for (let i = 0; i < 30; i++) {
    codes.push({
      code: generateCode(false),
      type: 'MONTHLY',
      status: 'AVAILABLE',
      createdAt: new Date().toISOString()
    });
  }

  return codes;
};
