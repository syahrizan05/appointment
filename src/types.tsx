export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  AddAppointment: undefined;
  AppointmentDetail: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

////////////////////////////////////////////////////////////////////////////

export interface SlotInterface {
  name: string | undefined;
  label?: string;
  description?: string;
  selected?: boolean;
}

export interface ServiceInterface {
  name: string | undefined;
  label?: string;
  description?: string;
  selected?: boolean;

}

export interface CustomerInterface {
  name: string|undefined;
  phone: string|undefined;
  email?: string|undefined;
}


export interface Task {
  dateStart?: string| undefined;
  dateEnd?: string| undefined;
  task: ServiceInterface |string| undefined;
  customer?: CustomerInterface|string| undefined;
  slot?: SlotInterface | undefined;
  note?: string| undefined;
}

export interface AppDayInterface {
  title: string;
  data: Array<Task>;
}