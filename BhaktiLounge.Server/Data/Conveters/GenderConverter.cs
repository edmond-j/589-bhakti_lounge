using System.Text.Json;
using System.Text.Json.Serialization;
using BhaktiLounge.Server.Models.Extensions;

namespace BhaktiLounge.Server.Data.Conveters;

public class GenderConverter : JsonConverter<Gender>
{
    public override Gender Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string gender = reader.GetString();
        if (gender == null)
        {
            gender = "Other";
        }
        return (Gender)Enum.Parse(typeof(Gender), gender, ignoreCase: true);
    }

    public override void Write(Utf8JsonWriter writer, Gender value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}