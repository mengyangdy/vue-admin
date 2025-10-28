import { transformRecordToOption } from '@/utils/common';

export const userGenderRecord: Record<Api.SystemManage.gender, App.I18n.I18nKey> = {
  0: 'page.manage.user.gender.unknown',
  1: 'page.manage.user.gender.male',
  2: 'page.manage.user.gender.female',
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'common.status.enable',
  '2': 'common.status.disable',
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);
