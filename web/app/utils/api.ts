import { type AxiosResponse } from 'axios';
import request from './request';

interface checkTravelDiary{
  travalNotesId: string;
  checkStatus: number;
}

const CheckTravelDiaryApi = {
  postCheckRequest: async (data: Partial<checkTravelDiary>) =>
    await request.post<checkTravelDiary, AxiosResponse<Partial<checkTravelDiary>>>(
      `/check`,
      data
    ),
};

const defaultExport = {
  CheckTravelDiaryApi
};

export default defaultExport;
