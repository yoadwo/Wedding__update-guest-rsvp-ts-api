export default {
  type: "object",
  properties: {
    inviteCode: { type: 'string' },
    attending: { type: 'number'},
    status: { type: 'number'}
  },
  required: ['inviteCode', 'attending']
} as const;
