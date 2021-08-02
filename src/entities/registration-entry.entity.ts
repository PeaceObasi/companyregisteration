import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registration_entry')
export class RegistrationEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: new Date().getDate() })
    txnDay: number;

    @Column({ default: new Date().getMonth() })
    txnMonth: number;

    @Column({ default: new Date().getFullYear() })
    txnYear: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    businessName: string;

    @Column()
    contactNumber: number;

    @Column()
    email: string;

    @Column()
    typeOfBusiness: string;

    @Column()
    description: string;

}