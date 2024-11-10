import { IsNotEmpty, IsString } from "class-validator";

export class CreateTrackingStatusDto {
    @IsNotEmpty()
    @IsString()
    status:string
}
