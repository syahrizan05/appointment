import { SlotInterface, ServiceInterface, CustomerInterface, Task, AppDayInterface } from '../types'

export const taskListDefault: Array<Task> = [
  {
    dateStart: "2020-09-15T12:46:04+08:00",
    dateEnd: "2020-09-15T14:46:04+08:00",
    task: { name: "task 1" },
    customer: { name: "Jenab", phone: "1234567890" },
    slot: { name: "a" },
  },
  {
    dateStart: "2020-09-15T15:46:04+08:00",
    dateEnd: "2020-09-15T16:46:04+08:00",
    task: { name: "task 1" },
    customer: { name: "Timah", phone: "1234567890" },
    slot: { name: "a" },
  },
  {
    dateStart: "2020-09-19T13:46:04+08:00",
    dateEnd: "2020-09-19T12:46:04+08:00",
    task: { name: "task 1" },
    customer: { name: "Kak Nor", phone: "1234567890" },
    slot: { name: "b" },
  },
  {
    dateStart: "2020-09-20T14:46:04+08:00",
    dateEnd: "2020-09-20T12:46:04+08:00",
    task: { name: "task 1" },
    customer: { name: "Senah", phone: "1234567890" },
    slot: { name: "b" },
  },
  {
    dateStart: "2020-09-22T13:46:04+08:00",
    dateEnd: "2020-09-22T12:46:04+08:00",
    task: { name: "task 1" },
    customer: { name: "Jenab", phone: "1234567890" },
    slot: { name: "b" },
  },
  {
    dateStart: "2020-09-24T13:46:04+08:00",
    dateEnd: "2020-09-24T12:46:04+08:00",
    task: { name: "task 1" },
    customer: { name: "Jenab", phone: "1234567890" },
    slot: { name: "b" },
  }
]


export const customerListDefault: Array<CustomerInterface> = [
  {
    name: "Tracey Walsh",
    phone: "(968) 584-3114",
  },
  {
    name: "Valarie Case",
    phone: "(885) 596-2466"
  },
  {
    name: "Margarita Mosley",
    phone: "(969) 409-2303"
  },
  {
    name: "Gracie Dean",
    phone: "(942) 534-2548"
  },
  {
    name: "Debora Rivas",
    phone: "(845) 507-2916"
  },
  {
    name: "Lacy Robinson",
    phone: "(952) 453-3223"
  },
  {
    name: "Robyn Mccall",
    phone: "(853) 547-3665"
  },
  {
    name: "Gabriela Gates",
    phone: "(822) 505-2290"
  },
  {
    name: "Mia Villarreal",
    phone: "(963) 498-3484"
  },
  {
    name: "Renee Chan",
    phone: "(828) 578-3546"
  },
  {
    name: "Lawanda Trevino",
    phone: "(895) 417-3626"
  },
  {
    name: "Ava Wells",
    phone: "(882) 566-2382"
  },
  {
    name: "Jeannie Gilliam",
    phone: "(822) 560-3689"
  },
  {
    name: "Estella Solis",
    phone: "(901) 405-3765"
  },
  {
    name: "Jaclyn Blevins",
    phone: "(969) 537-3045"
  },
  {
    name: "Gabrielle Ferguson",
    phone: "(912) 525-3336"
  },
  {
    name: "Celia Estrada",
    phone: "(898) 542-2983"
  },
  {
    name: "Simone Stout",
    phone: "(916) 532-2545"
  },
  {
    name: "Esther Livingston",
    phone: "(805) 501-2936"
  },
  {
    name: "Doris Bradford",
    phone: "(933) 537-2113"
  },
  {
    name: "Roseann Welch",
    phone: "(834) 567-3104"
  },
  {
    name: "Jo Colon",
    phone: "(917) 495-2916"
  },
  {
    name: "Alta Benjamin",
    phone: "(900) 546-3806"
  },
  {
    name: "Erika Chase",
    phone: "(946) 600-3711"
  },
  {
    name: "Abby Duffy",
    phone: "(883) 534-3891"
  },
  {
    name: "Raquel Mann",
    phone: "(922) 423-3003"
  },
  {
    name: "Betty Guerra",
    phone: "(989) 468-3393"
  },
  {
    name: "Bernice Barrera",
    phone: "(814) 479-2047"
  },
  {
    name: "Marietta Langley",
    phone: "(962) 595-2442"
  },
  {
    name: "Keisha Beasley",
    phone: "(875) 464-3061"
  },
  {
    name: "Aimee Aguirre",
    phone: "(817) 555-3459"
  },
  {
    name: "Leslie Patrick",
    phone: "(969) 498-2552"
  },
  {
    name: "Cherry Cantrell",
    phone: "(812) 415-2308"
  },
  {
    name: "Jenna Weeks",
    phone: "(844) 564-2498"
  },
  {
    name: "Janice Donaldson",
    phone: "(836) 424-3147"
  },
  {
    name: "Debbie Walker",
    phone: "(955) 467-3320"
  },
  {
    name: "Jordan Bradley",
    phone: "(910) 432-2917"
  },
  {
    name: "Lily Wilkinson",
    phone: "(963) 403-2800"
  },
  {
    name: "Helen Moody",
    phone: "(904) 428-2010"
  },
  {
    name: "Andrea Cantu",
    phone: "(943) 503-3156"
  },
  {
    name: "Clara Coleman",
    phone: "(918) 475-2709"
  },
  {
    name: "Regina Spears",
    phone: "(848) 515-2164"
  },
  {
    name: "Cassie Wagner",
    phone: "(822) 564-3164"
  },
  {
    name: "Jane Pitts",
    phone: "(989) 406-2972"
  },
  {
    name: "Deborah French",
    phone: "(978) 594-2280"
  },
  {
    name: "Lynne Jacobs",
    phone: "(827) 493-3869"
  },
  {
    name: "Beatrice Crosby",
    phone: "(950) 441-3711"
  },
  {
    name: "Therese Koch",
    phone: "(942) 436-2497"
  },
  {
    name: "Sharlene Davidson",
    phone: "(824) 509-2908"
  },
  {
    name: "Mattie Hampton",
    phone: "(972) 559-3600"
  },
  {
    name: "Shauna Larsen",
    phone: "(963) 582-3609"
  },
  {
    name: "Silvia Morse",
    phone: "(820) 453-2188"
  },
  {
    name: "Angelia Bryant",
    phone: "(861) 409-2554"
  },
  {
    name: "Bettye Bean",
    phone: "(942) 528-2113"
  },
  {
    name: "Kimberley Garner",
    phone: "(871) 436-2061"
  },
  {
    name: "Kate Gilbert",
    phone: "(917) 495-3331"
  },
  {
    name: "Vicki Burton",
    phone: "(949) 445-2128"
  },
  {
    name: "Keri Murray",
    phone: "(903) 558-3684"
  },
  {
    name: "Gay Russell",
    phone: "(852) 530-3207"
  },
  {
    name: "Catherine Middleton",
    phone: "(889) 595-2594"
  },
  {
    name: "Paula Robertson",
    phone: "(868) 468-2565"
  },
  {
    name: "Judy Olson",
    phone: "(825) 508-3132"
  },
  {
    name: "Velma Bowers",
    phone: "(977) 521-2245"
  },
  {
    name: "Enid Rogers",
    phone: "(877) 401-2314"
  },
  {
    name: "Alisha Reeves",
    phone: "(936) 523-3032"
  },
  {
    name: "Mallory Hamilton",
    phone: "(909) 535-2264"
  },
  {
    name: "Casandra Short",
    phone: "(860) 560-3553"
  },
  {
    name: "Johnnie Calderon",
    phone: "(925) 451-3522"
  },
  {
    name: "Leann Haney",
    phone: "(946) 402-2612"
  },
  {
    name: "Trisha Odom",
    phone: "(954) 531-2606"
  },
  {
    name: "Dena Alexander",
    phone: "(939) 426-3569"
  },
  {
    name: "Deidre Prince",
    phone: "(870) 435-2822"
  },
  {
    name: "Jennifer Hunt",
    phone: "(876) 564-3283"
  },
  {
    name: "Corrine Marks",
    phone: "(917) 495-2895"
  },
  {
    name: "Lynette Flowers",
    phone: "(965) 446-2422"
  },
  {
    name: "Monique Bond",
    phone: "(832) 436-2226"
  },
  {
    name: "Agnes Knox",
    phone: "(977) 517-3792"
  },
  {
    name: "Blanche Blanchard",
    phone: "(882) 431-2789"
  },
  {
    name: "Beth Mendez",
    phone: "(919) 557-3432"
  },
  {
    name: "Gale Lynn",
    phone: "(855) 574-3604"
  },
  {
    name: "Dianna Ewing",
    phone: "(812) 456-3866"
  },
  {
    name: "Nora Lang",
    phone: "(884) 449-2458"
  },
  {
    name: "Adeline Morrow",
    phone: "(923) 452-3053"
  },
  {
    name: "Sally Torres",
    phone: "(895) 468-3494"
  },
  {
    name: "Angelica Strong",
    phone: "(817) 441-2147"
  },
  {
    name: "Maura Cox",
    phone: "(842) 411-3727"
  },
  {
    name: "Wendi Jefferson",
    phone: "(954) 555-3585"
  },
  {
    name: "Jessica Barry",
    phone: "(979) 568-2543"
  },
  {
    name: "Juliette Sherman",
    phone: "(950) 590-3473"
  },
  {
    name: "Natasha Reed",
    phone: "(911) 429-2474"
  },
  {
    name: "Shelley Cotton",
    phone: "(871) 572-3413"
  },
  {
    name: "Bertie Chaney",
    phone: "(936) 541-2146"
  },
  {
    name: "Madeleine Christian",
    phone: "(812) 595-2773"
  },
  {
    name: "Amie Cohen",
    phone: "(959) 427-2922"
  },
  {
    name: "Aurora Mcknight",
    phone: "(941) 567-2485"
  },
  {
    name: "Eliza Owens",
    phone: "(850) 496-3727"
  },
  {
    name: "Marquita Hurley",
    phone: "(874) 499-3718"
  },
  {
    name: "Annie Guy",
    phone: "(927) 524-3891"
  },
  {
    name: "Janis Johns",
    phone: "(910) 497-2759"
  },
  {
    name: "Hallie Day",
    phone: "(834) 477-2286"
  }
]


export const slotListDefault: Array<SlotInterface> = [
  {
    name: "a",
    label: "a",
    description: ""
  },
  {
    name: "b",
    label: "b",
    description: ""
  }
]

export const serviceListDefault: Array<ServiceInterface> = [
  {
    name: "Haircut",
    label: "",
    description: ""
  },
  {
    name: "Color Rambut",
    label: "",
    description: ""
  },
  {
    name: "Bekam",
    label: "",
    description: ""
  },
]