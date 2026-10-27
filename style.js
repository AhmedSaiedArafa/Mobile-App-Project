import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

cssInterop(LinearGradient, { className: 'style' });

export const colors = {
  primary: '#4237D6',
  gradient: ['#4237D6', '#6B4EF2'],
  canvas: '#F6F7FC',
  ink: '#1C1B3A',
  muted: '#6B6A85',
  white: '#FFFFFF',
};

export const styles = {
  screen: 'flex-1 bg-canvas',
  listContent: 'px-5 pb-5',
  formContent: 'px-5 pb-6',
  detailsContent: 'px-5 pb-8',

  headerRow: 'flex-row items-center px-5 pb-4',
  backButton: 'w-11 h-11 rounded-full bg-white items-center justify-center mr-3 shadow-md',
  headerTitle: 'text-[22px] font-bold text-ink',
  headerSubtitle: 'text-[13px] text-muted mt-0.5',

  gradientCard: 'rounded-[22px] p-[22px] mb-3.5',
  cardTop: 'flex-row justify-between items-center',
  cardLabel: 'text-sm text-on-primary',
  cardAmount: 'text-[34px] font-extrabold text-white mt-1.5',
  cardCurrency: 'text-base font-bold text-on-primary',
  cardPill:
    'self-start mt-3.5 text-xs font-semibold text-white bg-white/20 px-3 py-1.5 rounded-[14px] overflow-hidden',

  accountCard: 'flex-row items-center bg-white p-4 rounded-[20px] mb-3.5 shadow-md active:opacity-80',
  accountInfo: 'flex-1 ml-3.5',
  accountBank: 'text-base font-bold text-ink',
  accountSub: 'text-[13px] text-muted mt-1',
  accountRight: 'items-end mr-1.5',
  accountBalance: 'text-sm font-bold text-ink mb-1',

  bankBadge: 'w-12 h-12 rounded-full items-center justify-center',
  bankBadgeText: 'text-[13px] font-extrabold',
  statusPill: 'text-xs font-bold text-success bg-success-bg px-2.5 py-1 rounded-xl overflow-hidden',

  footer: 'bg-white pt-3.5 px-5 border-t border-divider',
  footerPress: 'rounded-2xl overflow-hidden active:opacity-80',
  footerButton: 'min-h-[54px] flex-row items-center justify-center',
  footerText: 'text-base font-bold text-white ml-1.5',
  linkTile:
    'min-h-[64px] rounded-[20px] border-[1.5px] border-dashed border-dash items-center justify-center',
  linkTileText: 'text-[15px] font-bold text-primary',

  empty: 'items-center my-10',
  emptyText: 'mt-2.5 text-[15px] text-muted',

  heroTop: 'flex-row items-center',
  heroNames: 'flex-1 ml-3',
  heroBank: 'text-lg font-bold text-white',
  heroType: 'text-[13px] text-on-primary mt-0.5',
  heroLabel: 'text-[13px] text-on-primary mt-6',
  heroRow: 'flex-row items-center justify-between mt-1',
  heroBalance: 'text-[32px] font-extrabold text-white',
  infoCard: 'bg-white rounded-[20px] px-[18px] py-2 shadow-md',
  infoTitle: 'text-base font-bold text-ink pt-2.5 pb-1',
  infoRow: 'flex-row justify-between items-center py-[15px]',
  infoRowBorder: 'border-b border-divider',
  infoLabel: 'text-sm text-muted',
  infoValue: 'text-sm font-bold text-ink',
  numberRow: 'flex-row items-center',
  syncedText: 'text-center text-muted text-xs mt-3.5',

  field: 'mb-[18px]',
  fieldLabel: 'text-sm font-semibold text-ink mb-2',
  input: 'min-h-[50px] bg-white rounded-[14px] px-3.5 text-[15px] text-ink',
  inputOk: 'border border-line',
  inputError: 'border-[1.5px] border-danger',
  errorText: 'text-xs text-danger mt-1.5',
  chipRow: 'flex-row flex-wrap',
  chip: 'min-h-[44px] px-[18px] rounded-full justify-center border mr-2 mb-2',
  chipOff: 'bg-white border-line',
  chipOn: 'bg-primary border-primary',
  chipText: 'text-sm font-semibold',
  chipTextOff: 'text-ink',
  chipTextOn: 'text-white',
  segmentTrack: 'flex-row bg-track rounded-2xl p-1',
  segment: 'flex-1 min-h-[44px] rounded-xl items-center justify-center',
  segmentOn: 'bg-white shadow-sm',
  segmentOff: 'bg-transparent',
  segmentText: 'font-semibold',
  segmentTextOn: 'text-primary',
  segmentTextOff: 'text-muted',
  noteBox: 'flex-row items-center bg-primary-light rounded-[14px] p-3.5',
  noteText: 'flex-1 ml-2.5 text-[13px] text-note',
};
