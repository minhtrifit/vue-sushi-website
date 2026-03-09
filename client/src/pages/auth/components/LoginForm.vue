<script setup>
import { z } from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { PhLockOpen } from "@phosphor-icons/vue";

const props = defineProps({
  defaultValue: {
    type: Object,
    default: () => ({
      email: "",
      password: "",
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit-login"]);

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: props.defaultValue,
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

// Handle submit form
const onSubmit = handleSubmit((values) => {
  emit("submit-login", {
    value: values,
    resetFn: resetForm,
  });
});
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" elevation="6">
      <v-card-title class="text-h5 text-center">Sign In</v-card-title>

      <v-card-text>
        <form @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email"
            :error-messages="emailError"
          />

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            :error-messages="passwordError"
          />

          <v-btn
            block
            color="primary"
            type="submit"
            class="mt-4"
            :loading="props.loading"
          >
            <PhLockOpen size="20" />
            <span style="margin-left: 10px">Login</span>
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
