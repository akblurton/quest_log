defmodule QuestLog.Accounts.Guardian do
  use Guardian, otp_app: :quest_log
  alias QuestLog.Accounts.User
  alias QuestLog.Accounts

  def subject_for_token(%User{} = resource, _claims) do
    sub = to_string(resource.id)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :invalid_resource}
  end

  def resource_from_claims(%{"sub" => id}) do
    user = Accounts.get_user!(id)
    {:ok, user}
  rescue
    Ecto.NoResultsError -> {:error, :resource_not_found}
  end

  def resource_from_claims(_claims) do
    {:error, :missing_claims}
  end

  def access_token(%User{} = resource, claims \\ %{}) do
    case refresh_token(resource) do
      {:ok, refresh, _} ->
        encode_and_sign(resource, claims |> Map.put(:refresh_token, refresh),
          token_type: "access",
          ttl: {15, :hours}
        )

      error ->
        error
    end
  end

  def refresh_token(%User{} = resource, claims \\ %{}) do
    encode_and_sign(resource, claims, token_type: "refresh", ttl: {52, :weeks})
  end
end
