import { $Enums } from "@prisma/client";
import { z } from "zod";

const postEntryFormSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    location: z.string().optional(),
    mode: z.nativeEnum($Enums.WorkMode),
    type: z.nativeEnum($Enums.EmploymentType),
    role: z.string().min(5, "Role must be at least 5 characters long"),
    experience: z.number().int().positive().default(0),
    salary: z.number().optional(),
    salaryUnit: z.nativeEnum($Enums.WorkUnit).default($Enums.WorkUnit.YEAR),
    tenure: z.number().optional(),
    tenureUnit: z.nativeEnum($Enums.WorkUnit).default($Enums.WorkUnit.YEAR),
    status: z.nativeEnum($Enums.Status).default($Enums.Status.ACTIVE),
})
    .refine((data) => {
        // Require location for onsite or hybrid work modes
        if ((data.mode === $Enums.WorkMode.ONSITE || data.mode === $Enums.WorkMode.HYBRID) && !data.location) {
            return false;
        }
        return true;
    }, {
        message: "Location is required for onsite or hybrid work modes.",
        path: ["location"],
    })
    .refine((data) => {
        // Require tenure for contract, internships, or part-time employment types
        if ((data.type === $Enums.EmploymentType.CONTRACT || data.type === $Enums.EmploymentType.INTERNSHIP || data.type === $Enums.EmploymentType.PART_TIME) && data.tenure === undefined) {
            return false;
        }
        return true;
    }, {
        message: "Tenure is required for contract, internship, or part-time positions.",
        path: ["tenure"],
    });

export { postEntryFormSchema };