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
  name: string | null;
  label?: string;
  description?: string;
  selected?: boolean;
}

export interface ServiceInterface {
  name: string | null;
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
  dateStart?: string;
  dateEnd?: string;
  task: ServiceInterface | null;
  customer?: CustomerInterface;
  slot?: SlotInterface | null;
  note?: string| null;
}

export interface AppDayInterface {
  title: string;
  data: Array<Task>;
}