defmodule AdventureLog.Accounts.Guardian do
  use Guardian, otp_app: :adventure_log
  alias AdventureLog.Accounts.User
  alias AdventureLog.Accounts

  def subject_for_token(%User{} = resource, _claims) do
    sub = to_string(resource.id)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :invalid_resource}
  end

  def resource_from_claims(%{"sub" => id}) do
    case Accounts.get_user(id) do
      nil -> {:error, :resource_not_found}
      user -> {:ok, user}
    end
  end

  def resource_from_claims(_claims) do
    {:error, :missing_claims}
  end
end
