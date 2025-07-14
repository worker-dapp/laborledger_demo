import supabase from "../supabaseClient";

export async function SubmitJob(formData) {
  const { data, error } = await supabase
    .from("jobs")
    .insert([
      {
        job_title: formData.jobTitle,
        job_location_type: formData.jobLocationType,
        job_location: formData.jobLocation,
        company_name: formData.companyName,
        notification_email: formData.notificationEmail,
        reference_code: formData.referenceCode,
        job_type: formData.JobType,
        job_pay: formData.jobPay,
        currency: formData.currency,
        pay_frequency: formData.payFrequency,
        additional_compensation: formData.additionalCompensation,
        employee_benefits: formData.employeeBenefits,
        summary: formData.summary,
        selected_oracles: Array.isArray(formData.selectedOracles)
          ? formData.selectedOracles.join(",")
          : formData.selectedOracles,
        verification_notes: formData.verificationNotes,
        responsiblities: formData.responsiblities,
        skills: formData.skills,
        associated_skills: formData.associatedSkills,
        company_description: formData.companyDescription,
      },
    ]);

  if (error) {
    console.error("Error inserting job:", error);
    return { success: false, error };
  }

  return { success: true, data };
}
