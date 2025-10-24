import { transformRecordToOption } from "@/utils/common";

export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
  '1': 'page.manage.user.gender.male',
  '2': 'page.manage.user.gender.female',
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);
